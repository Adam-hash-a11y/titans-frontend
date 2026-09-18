import { Accordion } from "@base-ui/react/accordion";

export const GymAccodion = () => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            What Titans Gym ?
            <PlusIcon />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div>
            Titans Gym is a place where you build your in anyway you which.
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            How do I join?
            <PlusIcon />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div>
            Fill out the registration form with your details and a profile
            photo, pick your membership plan, and you're in. No hidden fees, no
            long-term commitment required.
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            What membership plans are available?
            <PlusIcon />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div>
            <div>
              We offer Basic, Standard, and Premium plans, so you can pick what
              fits your goals and budget.
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
};
const PlusIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M1.5 8h13M8 14.5v-13" />
    </svg>
  );
};
