import { Button } from '@nextui-org/button';

export function PrimaryButton(properties: Parameters<typeof Button>[0]) {
  return <Button className="text-white" color="primary" {...properties} />;
}
