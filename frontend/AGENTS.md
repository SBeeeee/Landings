<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

<!-- BEGIN:backend-integration-rules -->
# Backend Integration Architecture

Every feature that talks to the backend follows the **same 4-layer pattern**. Never skip a layer, never mix concerns between layers.

```
Component / Page
      ↓  calls hook
useXxx()  (src/hooks/)
      ↓  dispatches thunk
xxxThunk  (src/store/thunks/)
      ↓  calls service
xxxService  (src/services/)
      ↓  calls API
api  (src/utils/api.ts)
      ↓  HTTP → backend
```

---

## Layer 1 — HTTP Client (`src/utils/api.ts`)

- Single Axios instance shared by every service.
- `baseURL` comes from `NEXT_PUBLIC_API_URL` (falls back to `http://localhost:5000/api`).
- `withCredentials: true` — cookies (session / refresh token) are sent automatically on every request.
- The response interceptor normalises errors: it always rejects with a plain `Error` whose `.message` is `response.data.error` → `err.message` → `"Something went wrong"`. Services and thunks never need to parse raw Axios errors.

**Rule:** Never create a second Axios instance. Never call `axios.get/post` directly — always import and use `api`.

---

## Layer 2 — Service (`src/services/`)

One file per domain (e.g. `auth.service.ts`, `business.service.ts`).

Responsibilities:
- Define the TypeScript interfaces for request payloads and response shapes.
- Make the actual `api.get / api.post / api.put / api.delete` calls.
- Return the unwrapped data (e.g. `res.data.user`), not the full Axios response.
- Never touch Redux state — services are pure async functions.

**Template for a new service:**

```ts
// src/services/example.service.ts
import api from '../utils/api';

// ── Input / output types ──────────────────────────────────────────────────────
export interface CreateExampleInput { name: string; }
export interface Example { _id: string; name: string; createdAt: string; }

// ── Service object ────────────────────────────────────────────────────────────
const exampleService = {
  create: async (data: CreateExampleInput): Promise<Example> => {
    const res = await api.post('/examples', data);
    return res.data.example;          // unwrap the backend envelope
  },
  getAll: async (): Promise<Example[]> => {
    const res = await api.get('/examples');
    return res.data.examples;
  },
  getById: async (id: string): Promise<Example> => {
    const res = await api.get(`/examples/${id}`);
    return res.data.example;
  },
  update: async (id: string, data: Partial<CreateExampleInput>): Promise<Example> => {
    const res = await api.put(`/examples/${id}`, data);
    return res.data.example;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/examples/${id}`);
  },
};

export default exampleService;
```

---

## Layer 3 — Redux Slice (`src/store/slices/`)

One slice per domain. Manages the async state machine for that domain.

State shape always includes:
| field | type | purpose |
|---|---|---|
| `data` / domain noun | `T \| null` or `T[]` | the actual resource |
| `loading` | `boolean` | true while any thunk is pending |
| `error` | `string \| null` | last error message, cleared on next action |
| `initialized` | `boolean` | (optional) true after first fetch completes |

**Template:**

```ts
// src/store/slices/example.slice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { Example } from '../../services/example.service';
import { fetchExamplesThunk, createExampleThunk } from '../thunks/example.thunks';

interface ExampleState {
  items: Example[];
  loading: boolean;
  error: string | null;
}

const initialState: ExampleState = { items: [], loading: false, error: null };

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamplesThunk.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchExamplesThunk.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchExamplesThunk.rejected,  (state, action) => { state.loading = false; state.error = action.payload as string ?? 'Fetch failed'; })

      .addCase(createExampleThunk.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(createExampleThunk.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(createExampleThunk.rejected,  (state, action) => { state.loading = false; state.error = action.payload as string ?? 'Create failed'; });
  },
});

export const { clearError } = exampleSlice.actions;
export default exampleSlice.reducer;
```

**Rules:**
- Export `clearError` (and any other synchronous reducers) as named exports.
- Export the reducer as the default export — this is what gets registered in `store.ts`.
- Never put business logic in a reducer. Reducers only update state.

---

## Layer 4 — Thunks (`src/store/thunks/`)

One file per domain. Bridges the service and the slice.

**Template:**

```ts
// src/store/thunks/example.thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import exampleService from '../../services/example.service';
import type { Example, CreateExampleInput } from '../../services/example.service';

export const fetchExamplesThunk = createAsyncThunk<Example[], void>(
  'example/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await exampleService.getAll();
    } catch (error: any) {
      return rejectWithValue(error.message);   // error.message is already normalised by api.ts
    }
  }
);

export const createExampleThunk = createAsyncThunk<Example, CreateExampleInput>(
  'example/create',
  async (data, { rejectWithValue }) => {
    try {
      return await exampleService.create(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
```

**Rules:**
- Always use `rejectWithValue(error.message)` — never throw.
- The thunk action type string (`'example/fetchAll'`) must be unique across the whole store.
- Thunks never read or write Redux state directly (use `getState` only when genuinely needed for optimistic updates).

---

## Layer 5 — Hook (`src/hooks/`)

One hook per domain. This is the **only** thing components import. Components never call `useDispatch` or `useSelector` directly.

**Template:**

```ts
// src/hooks/useExample.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchExamplesThunk, createExampleThunk } from '../store/thunks/example.thunks';
import type { CreateExampleInput } from '../services/example.service';
import { clearError } from '../store/slices/example.slice';

export const useExample = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.example);

  return {
    // state
    items,
    loading,
    error,
    // actions — components call these, never dispatch directly
    fetchAll:     ()                       => dispatch(fetchExamplesThunk()),
    create:       (data: CreateExampleInput) => dispatch(createExampleThunk(data)),
    clearError:   ()                       => dispatch(clearError()),
  };
};
```

**Rules:**
- Always type `useDispatch` as `AppDispatch` and `useSelector` with `RootState`.
- Return plain action-dispatching functions, not the raw thunk or dispatch.
- Components destructure what they need: `const { items, loading, create } = useExample();`

---

## Registering a New Domain in the Store

After creating a slice, add it to `src/store/store.ts`:

```ts
import exampleReducer from './slices/example.slice';

export const store = configureStore({
  reducer: {
    auth:    authReducer,
    example: exampleReducer,   // ← add here
  },
});
```

`RootState` and `AppDispatch` are inferred automatically — no manual type changes needed.

---

## Existing Auth Feature — Reference Implementation

The auth domain is the canonical example of this pattern. Use it as the reference when building new features.

| File | Role |
|---|---|
| `src/utils/api.ts` | Axios instance, cookie handling, error normalisation |
| `src/services/auth.service.ts` | `register`, `login`, `logout`, `getMe` — returns `User` |
| `src/store/slices/authSlice.ts` | `{ user, loading, error, initialized }` state |
| `src/store/thunks/auth.thunks.ts` | `registerThunk`, `loginThunk`, `logoutThunk`, `getMeThunk` |
| `src/hooks/useAuth.ts` | `{ user, loading, error, isLoggedIn, login, register, logout, restoreSession, clearError }` |

Session restoration on app load: call `restoreSession()` (which dispatches `getMeThunk`) once in the root layout. The `initialized` flag goes `true` after the first `/users/me` response (success or 401), so the UI can gate rendering on it.

---

## Quick Checklist for Every New Feature

- [ ] `src/services/feature.service.ts` — interfaces + API calls
- [ ] `src/store/slices/feature.slice.ts` — state shape + extraReducers for every thunk
- [ ] `src/store/thunks/feature.thunks.ts` — one thunk per API call
- [ ] `src/hooks/useFeature.ts` — single hook that components consume
- [ ] Register reducer in `src/store/store.ts`
- [ ] Components only import the hook, never `useDispatch` / `useSelector` directly

<!-- END:backend-integration-rules -->
