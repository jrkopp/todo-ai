# SQLite on disk for local Task persistence

The app has no cloud backend — all Task data is persisted in a SQLite file on disk, read and written exclusively via Next.js Server Actions. Browser storage (IndexedDB/localStorage) was rejected because it is tied to a browser profile and can be cleared unexpectedly; a flat JSON file was rejected because it lacks atomic writes and becomes unwieldy as the dataset grows. SQLite gives reliable, queryable persistence with no external process required.
