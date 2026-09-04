import LegalContent from "@/designUI/components/LegalContent/LegalContent";
import { usePrivacyPolicy } from "./function";

export default function PrivacyPolicy() {
  const { data } = usePrivacyPolicy();

  return <LegalContent title={data.title} updatedAt={data.updatedAt} content={data.content} />;
}
