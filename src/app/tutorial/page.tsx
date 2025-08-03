import { TutorialSteps } from '@/components/tutorial/TutorialSteps';
import { getBranding } from '@/lib/branding';

const branding = getBranding();

export default function TutorialPage() {
  return <TutorialSteps branding={branding} />;
}
