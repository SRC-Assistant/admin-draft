import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 p-6">
      <h1 className="text-4xl font-semibold mb-4">Something went wrong</h1>
      <p className="text-lg mb-2">Sorry, we couldn&apos;t load this page.</p>
      <pre className="max-w-lg overflow-auto rounded bg-slate-900 p-4 text-sm text-slate-200">
        {String(error)}
      </pre>
    </div>
  );
}
