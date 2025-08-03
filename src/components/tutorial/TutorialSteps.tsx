import { CodeBlock } from '@/components/ui/CodeBlock';
import { tutorialSteps } from '@/data/tutorialSteps';
import { type Branding } from '@/lib/branding';
import ReactMarkdown from 'react-markdown';

export const TutorialSteps = ({ branding }: { branding: Branding }) => {
  const {
    primaryColor,
    accentColor,
    backgroundColor,
    textColor,
  } = branding;
  
  return (
    <div
      className="min-h-screen w-full pt-24"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          Getting Started with the API
        </h1>

        {tutorialSteps.map((step) => (
          <div key={step.id} className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: accentColor }}>
              {step.title}
            </h2>

            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,

                strong: ({ children }) => (
                  <strong className="font-semibold" style={{ color: primaryColor }}>
                    {children}
                  </strong>
                ),

                code: ({ children }) => (
                  <code
                    className="text-sm px-1 py-0.5 rounded"
                    style={{ color: primaryColor }}
                  >
                    {children}
                  </code>
                ),

                ul: ({ children }) => (
                  <ul
                    className="list-disc list-inside ml-4 mb-4"
                  >
                    {children}
                  </ul>
                ),

                li: ({ children }) => (
                  <li className="mb-1">
                    {children}
                  </li>
                ),

                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                    style={{ color: accentColor }}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {step.description}
            </ReactMarkdown>

            <CodeBlock
              code={step.codeExample}
              language={step.language}
              branding={branding}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
