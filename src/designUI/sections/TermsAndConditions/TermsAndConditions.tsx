import LegalContent from "@/designUI/components/LegalContent/LegalContent";
import { useTermsAndConditions } from "./function";

export default function TermsAndConditions() {
  const { data } = useTermsAndConditions();

  return <LegalContent title={data.title} updatedAt={data.updatedAt} content={data.content} />;
}
