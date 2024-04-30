import { SupabaseClient } from "@supabase/supabase-js";
import type { PostgrestError } from "@supabase/supabase-js";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export class SupabaseWrapper {
  private client: SupabaseClient;
  // private systemId: number;

  constructor(client: SupabaseClient) {
    this.client = client;
    // this.systemId = systemId;
  }

  public wclient(): SupabaseClient<any, "public", any> {
    return this.client;
  }

  public async rpc<T>(
    functionName: string,
    where: Equals = {}
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    let query = this.client.rpc(functionName, {
      ...where,
    });
    //@ts-ignore
    return await query;
  }

  public upsert<T>(
    tableName: string,
    value: any,
    options: options = {}
  ): PostgrestFilterBuilder<any, any, T, string, unknown> {
    let query = this.client
      .from(tableName)
      //@ts-ignore
      .upsert({ ...value }, options);

    //@ts-ignore
    return query;
  }

  public update<T>(
    tableName: string,
    value: any,
    match: Equals = {}
  ): PostgrestFilterBuilder<any, any, T, string, unknown> {
    let query = this.client
      .from(tableName)
      .update({ ...value })
      .match({ ...match });

    //@ts-ignore
    return query;
  }

  public delete<T>(
    tableName: string,
    match: Equals = {}
  ): PostgrestFilterBuilder<any, any, T, string, unknown> {
    let query = this.client
      .from(tableName)
      .delete()
      .match({ ...match });

    //@ts-ignore
    return query;
  }

  public select<T>(
    tableName: string,
    columns: string = "*",
    isSingle = false
  ): PostgrestFilterBuilder<any, any, T, string, unknown> {
    let query = this.client.from(tableName).select(columns);
    if (isSingle) {
      //@ts-ignore
      return query.single();
    }

    //@ts-ignore
    return query;
  }

  public async insert<T>(
    tableName: string,
    data: InsertParams<T>
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    const { data: insertedData, error } = await this.client
      .from(tableName)
      .insert({ ...data })
      .single();

    return { data: insertedData, error };
  }
}

// Typdefinition för parametrar för att lägga till data, exkluderar system_id som automatiskt hanteras av wrappern
type Equals = {
  [key: string]: string | number;
};

type options =
  | {
      onConflict?: string | string[] | undefined;
      ignoreDuplicates?: boolean | undefined;
      count?: "exact" | "planned" | "estimated" | undefined;
    }
  | undefined;

// Typdefinition för parametrar för att lägga till data, exkluderar 'system_id'
type InsertParams<T> = Omit<T, "system_id">;

// Interface som beskriver tillgängliga metoder och egenskaper i SupabaseWrapper
interface ISupabaseWrapper {
  wclient: SupabaseClient<any, "public", any>;

  rpc<T>(
    tableName: string,
    where?: Equals
  ): Promise<{ data: T | null; error: PostgrestError | null }>;

  select<T>(
    tableName: string,
    columns: string,
    isSingle?: Boolean
  ): PostgrestFilterBuilder<any, any, T, string, unknown>;

  delete<T>(
    tableName: string,
    match: Equals
  ): PostgrestFilterBuilder<any, any, T, string, unknown>;

  upsert<T>(
    tableName: string,
    value: any,
    options?: options
  ): PostgrestFilterBuilder<any, any, T, string, unknown>;

  update<T>(
    tableName: string,
    value: any,
    match: Equals
  ): PostgrestFilterBuilder<any, any, T, string, unknown>;

  insert<T>(
    tableName: string,
    data: InsertParams<T>
  ): Promise<{ data: T | null; error: PostgrestError | null }>;
}

export function useSupabaseWrapper(): ISupabaseWrapper {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$supabaseWrapper as ISupabaseWrapper;
}
