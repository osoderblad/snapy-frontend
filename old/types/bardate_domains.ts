// type BardateDomainsInfo = {
//   id: bigint;
//   created_at: Date;  // Timestamptz motsvarar JavaScript Date-objekt
//   url_length: number;  // Numeric motsvarar number i TypeScript
//   available: boolean;  // Bool motsvarar boolean
//   cctld: string;  // Text motsvarar string
//   days_until_release: number;  // Integer motsvarar number
// };

// type BardateDomains = {
//   id: bigint;
//   name: string;  // Text motsvarar string
//   release_at: Date;  // Date motsvarar JavaScript Date-objekt
//   created_at: Date;  // Timestamptz motsvarar JavaScript Date-objekt
//   updated_at: Date;  // Timestamp motsvarar JavaScript Date-objekt, men utan time zone
//   ttl: Date;  // Timestamptz motsvarar JavaScript Date-objekt
//   domain_id: bigint;  // ForeignKey referens till BardateDomainsInfo
// };

export type BardateDomainsResult = {
  data: CombinedDomainInfo[];
  count: number;
};

export type CombinedDomainInfo = {
  id: bigint;
  name: string;
  release_at: Date;
  domain_created_at: Date;
  updated_at: Date;
  ttl: Date;
  info_created_at: Date;
  url_length: number;
  available: boolean;
  cctld: string;
  days_until_release: number;
};
