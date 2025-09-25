// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectDetails, type Project } from "./projectData";

type Params = { slug: string };

const severityStyles: Record<
  NonNullable<Project["findings"]>[number]["severity"],
  string
> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

export default function ProjectPage({ params }: { params: Params }) {
  const project = projectDetails[params.slug];
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="mt-2 text-sm text-neutral-600">{project.timeline}</p>
      </header>

      <section className="prose prose-neutral max-w-none">
        <p>{project.fullDescription}</p>
      </section>

      {!!project.technologies?.length && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Technologies</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li
                key={t}
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {!!project.details?.length && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Details</h2>
          <ul className="mt-3 list-disc pl-6">
            {project.details.map((d, i) => (
              <li key={i} className="text-neutral-800">
                {d}
              </li>
            ))}
          </ul>
        </section>
      )}

      {!!project.metrics?.length && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Metrics</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.metrics.map((m, i) => (
              <div
                key={`${m.label}-${i}`}
                className="rounded-xl border border-neutral-200 p-4"
              >
                <div className="text-sm text-neutral-500">{m.label}</div>
                <div className="text-2xl font-semibold">{m.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!project.findings?.length && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Findings</h2>
          <div className="mt-3 space-y-4">
            {project.findings.map((f, i) => (
              <div
                key={`${f.title}-${i}`}
                className="rounded-xl border border-neutral-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium">{f.title}</h3>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityStyles[f.severity]}`}
                    title={`Severity: ${f.severity}`}
                  >
                    {f.severity.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-neutral-800">{f.description}</p>
                {f.cve ? (
                  <p className="mt-1 text-sm text-neutral-600">
                    CVE: <span className="font-mono">{f.cve}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {!!project.additionalSections?.length && (
        <section className="mt-8 space-y-6">
          {project.additionalSections.map((sec, i) => (
            <div
              key={`${sec.title}-${i}`}
              className="rounded-xl border border-neutral-200 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                {sec.icon ? (
                  <span className="text-neutral-700">{sec.icon}</span>
                ) : null}
                <h2 className="text-lg font-semibold">{sec.title}</h2>
              </div>
              {!!sec.content?.length && (
                <ul className="list-disc pl-6">
                  {sec.content.map((c, j) => (
                    <li key={j} className="text-neutral-800">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {(!!project.blogs?.length || project.github || project.liveDemo) && (
        <section className="mt-10 space-y-4">
          {!!project.blogs?.length && (
            <div>
              <h2 className="text-xl font-semibold">Related Posts</h2>
              <ul className="mt-3 list-disc pl-6">
                {project.blogs.map((b, i) => (
                  <li key={`${b.title}-${i}`}>
                    <Link href={b.link} className="text-blue-600 hover:underline">
                      {b.title}
                    </Link>
                    {b.description ? (
                      <span className="ml-2 text-sm text-neutral-600">
                        — {b.description}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.github || project.liveDemo) && (
            <div className="flex flex-wrap gap-3">
              {project.liveDemo && (
                <Link
                  href={project.liveDemo}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                >
                  Live Demo
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                >
                  GitHub
                </Link>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}
