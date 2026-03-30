import React, { useState, useEffect, useMemo, useDeferredValue } from 'react';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load users.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, deferredQuery]);

  const isStale = searchQuery !== deferredQuery;

  const handleClear = () => setSearchQuery('');

  return (
    <div className="directory-page">
      <div className="cartoon-bg" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="sparkle s1" />
        <span className="sparkle s2" />
        <span className="sparkle s3" />
      </div>

      <header className="page-header">
        <h1 className="directory-title">User Directory</h1>
        <p className="directory-subtitle">Meet the crew — browse &amp; search with style</p>
      </header>

      <section className="controls" aria-label="Search users">
        <div className="search-row">
          <label htmlFor="user-search" className="visually-hidden">
            Search users by name
          </label>
          <input
            id="user-search"
            type="search"
            className="search-input"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="button" className="btn-clear" onClick={handleClear}>
            Clear Filter
          </button>
        </div>
        <p className={`status-line ${isStale ? 'status-stale' : ''}`}>
          {loading
            ? 'Loading users…'
            : error
              ? `Something went wrong: ${error}`
              : `Showing ${filteredUsers.length} user${filteredUsers.length === 1 ? '' : 's'}${
                  deferredQuery.trim() ? ` for “${deferredQuery.trim()}”` : ''
                }`}
        </p>
      </section>

      <main className="main-grid-wrap">
        {loading && (
          <div className="skeleton-grid" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="empty-state">
            <span className="empty-emoji" aria-hidden="true">
              🔭
            </span>
            <p>No users match that name.</p>
            <button type="button" className="btn-clear ghost" onClick={handleClear}>
              Clear search
            </button>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <ul className="user-grid">
            {filteredUsers.map((user, index) => (
              <li
                key={user.id}
                className="user-card-wrap"
                style={{ '--stagger': `${Math.min(index, 12) * 45}ms` }}
              >
                <article className="user-card">
                  <h2 className="user-name">{user.name}</h2>
                  <p className="user-line">
                    <span className="label">Email:</span>{' '}
                    <a className="user-link" href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  </p>
                  <p className="user-line">
                    <span className="label">Company:</span>{' '}
                    <span>{user.company?.name ?? '—'}</span>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
