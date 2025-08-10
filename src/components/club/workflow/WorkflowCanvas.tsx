import { Bot, Calendar, Mail, Webhook, Rows } from "lucide-react";

export function WorkflowCanvas() {
  return (
    <div className="rounded-xl border p-4 overflow-x-auto">
      <div className="text-sm text-muted-foreground mb-3">Workflow (inspired by your diagram)</div>
      <div className="min-w-[800px] grid grid-cols-[200px,200px,1fr] items-center gap-6">
        {/* Row 1: Webhook -> Get Row -> AI Agent */}
        <Node icon={<Webhook size={18} />} title="Webhook" subtitle="POST" />
        <Connector />
        <Node icon={<Rows size={18} />} title="Get a row" subtitle="get: row" />
        <Connector />
        <AgentNode />

        {/* Tools under Agent */}
        <div />
        <div />
        <div className="flex items-center gap-8 mt-4">
          <Tool icon={<Bot size={18} />} title="OpenRouter Chat Model" />
          <Tool icon={<Calendar size={18} />} title="Create Google Calendar event" />
          <Tool icon={<Mail size={18} />} title="Send Gmail message" />
        </div>
      </div>
    </div>
  );
}

function Node({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center">{icon}</div>
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

function AgentNode() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="text-sm font-semibold">AI Agent</div>
      <div className="mt-2 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
        <div className="rounded-md border p-2">Chat Model</div>
        <div className="rounded-md border p-2">Memory</div>
        <div className="rounded-md border p-2">Tool</div>
      </div>
    </div>
  );
}

function Tool({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center" aria-hidden>
        {icon}
      </div>
      <div className="max-w-[180px]">{title}</div>
    </div>
  );
}

function Connector() {
  return <div className="h-0.5 bg-border" aria-hidden />;
}
