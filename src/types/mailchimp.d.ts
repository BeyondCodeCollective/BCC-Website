declare module "@mailchimp/mailchimp_marketing" {
  interface Config {
    apiKey: string;
    server: string;
  }

  interface ListMemberBody {
    email_address: string;
    status: "subscribed" | "unsubscribed" | "cleaned" | "pending" | "transactional";
    merge_fields?: Record<string, string>;
    tags?: string[];
  }

  interface Lists {
    setListMember(
      listId: string,
      subscriberHash: string,
      body: ListMemberBody
    ): Promise<Record<string, unknown>>;
    addListMember(
      listId: string,
      body: ListMemberBody
    ): Promise<Record<string, unknown>>;
  }

  const lists: Lists;

  function setConfig(config: Config): void;
}
