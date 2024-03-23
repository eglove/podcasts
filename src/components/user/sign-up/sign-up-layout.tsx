import { useToggle } from '@ethang/hooks/use-toggle';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { EyeIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

export function SignUpLayout() {
  const [isVisible, toggleVisibility] = useToggle(false);
  const [isConfirmVisible, toggleConfirmVisibility] = useToggle(false);

  return (
    <div className="my-4 flex size-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Input
            isRequired
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeIcon /> : <EyeSlashFilledIcon />}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? <EyeIcon /> : <EyeSlashFilledIcon />}
              </button>
            }
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? 'text' : 'password'}
            variant="bordered"
          />
          <Button color="primary" className="text-white" type="submit">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/login" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
