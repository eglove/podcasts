import { useToggle } from '@ethang/hooks/use-toggle';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { EyeIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

export function LoginLayout() {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div className="m-4 flex items-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-4 text-left text-3xl font-semibold">
          Log In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Input
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeIcon /> : <EyeSlashFilledIcon />}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
          />
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox
              defaultSelected
              className="text-white"
              name="remember"
              size="sm"
            >
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="text-white" color="primary" type="submit">
            Log In
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/signup" size="sm">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
