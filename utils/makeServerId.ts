import { formBinderURL } from "rx-binder";

export default ({ repo, gitref }: { repo: string; gitref: string }) =>
  formBinderURL({ repo, ref: gitref });
