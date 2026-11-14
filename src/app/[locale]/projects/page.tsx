import {PendingPage, pendingMetadata, type PendingPageProps} from "@/components/pages/pending-page";

export async function generateMetadata(props: PendingPageProps) {
  return pendingMetadata(props, "work", "/projects");
}

export default function Page(props: PendingPageProps) {
  return <PendingPage {...props} page="work" />;
}
