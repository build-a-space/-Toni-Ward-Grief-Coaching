'use client';

import { useActionState, useState } from 'react';
import { login, saveSection, setSiteOnline } from './actions';

function Status({ state }) {
  if (!state) return null;
  return (
    <p className={`admin-status ${state.error ? 'err' : 'ok'}`} role="status">
      {state.error || state.ok}
    </p>
  );
}

export function LoginForm({ configured }) {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="admin-card admin-login">
      <h1>Admin Login</h1>
      {!configured ? (
        <p className="admin-status err">
          ADMIN_PASSWORD is not set. Add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your Vercel project’s Environment Variables.
        </p>
      ) : null}
      <label>Username<input name="username" autoComplete="username" defaultValue={state?.username} key={state?.username} required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="btn btn-primary" disabled={pending}>{pending ? 'Checking…' : 'Log in'}</button>
      <Status state={state} />
    </form>
  );
}

export function SectionForm({ section, title, description, children }) {
  const [state, action, pending] = useActionState(saveSection, null);
  return (
    <form action={action} className="admin-card" id={section}>
      <h2>{title}</h2>
      {description ? <p className="admin-help">{description}</p> : null}
      <input type="hidden" name="_section" value={section} />
      <div className="admin-fields">{children}</div>
      <div className="admin-actions">
        <button className="btn btn-primary" disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function SiteToggle({ online }) {
  const [state, action, pending] = useActionState(setSiteOnline, null);
  const [confirming, setConfirming] = useState(false);
  return (
    <form action={action} className={`site-toggle ${online ? 'on' : 'off'}`}>
      <div>
        <p className="toggle-label">Website is currently</p>
        <p className="toggle-state">{online ? 'ON — live for everyone' : 'OFF — showing “be back soon”'}</p>
      </div>
      <input type="hidden" name="online" value={online ? 'false' : 'true'} />
      {online && !confirming ? (
        <button
          key="ask"
          type="button"
          className="btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            setConfirming(true);
          }}
        >
          Turn site OFF
        </button>
      ) : (
        <button key="submit" className={`btn ${online ? 'btn-danger' : 'btn-primary'}`} disabled={pending}>
          {pending ? 'Working…' : online ? 'Yes, turn it OFF' : 'Turn site ON'}
        </button>
      )}
      <Status state={state} />
    </form>
  );
}

export function Field({ label, name, defaultValue, type = 'text', hint, ...rest }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {type === 'textarea' ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} {...rest} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} {...rest} />
      )}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function ImageField({ label, name, current, hint, removable = true }) {
  const [preview, setPreview] = useState(current);
  return (
    <div className="admin-field image-field">
      <span>{label}</span>
      <div className="image-row">
        <div className="image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {preview ? <img src={preview} alt="" /> : <em>None</em>}
        </div>
        <div>
          <input
            type="file"
            name={name}
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
          />
          {removable && current ? (
            <label className="check"><input type="checkbox" name={`remove_${name}`} /> {name === 'logo' ? 'Reset to original logo' : 'Remove image'}</label>
          ) : null}
          {hint ? <small>{hint}</small> : null}
        </div>
      </div>
    </div>
  );
}
