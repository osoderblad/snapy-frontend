export type BardateDomain = {
  id: number; // bigint i SQL motsvarar number i TypeScript
  name: string | null; // 'text null' i SQL motsvarar string | null i TypeScript
  release_at: Date | null; // 'date null'
  created_at: Date; // 'timestamp with time zone' (not null)
  updated_at: Date | null; // 'timestamp without time zone null'
  ttl: Date | null; // 'timestamp with time zone null'
  domain_id: number; // bigint genereras som identitet, motsvarar number i TypeScript
};
