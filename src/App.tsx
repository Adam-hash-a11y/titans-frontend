import * as React from "react";
import styled from "styled-components";
import { Accordion } from "@base-ui/react/accordion";

const StyledAccordion = styled(Accordion.Root)`
  box-sizing: border-box;
  display: flex;
  max-width: 20rem;
  width: 100%;
  flex-direction: column;
  border: 1px solid oklch(14.5% 0 0deg);
  color: oklch(14.5% 0 0deg);

  @media (prefers-color-scheme: dark) {
    border: 1px solid white;
    color: white;
  }
`;

const StyledItem = styled(Accordion.Item)`
  & + & {
    border-top: 1px solid oklch(14.5% 0 0deg);

    @media (prefers-color-scheme: dark) {
      border-top: 1px solid white;
    }
  }
`;

const StyledHeader = styled(Accordion.Header)`
  margin: 0;
`;

const StyledTrigger = styled(Accordion.Trigger)`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  margin: 0;
  border: none;
  border-radius: 0;
  background-color: black;
  color: oklch(14.5% 0 0deg);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  text-align: left;
  -webkit-user-select: none;
  user-select: none;

  @media (prefers-color-scheme: dark) {
    color: white;
  }

  @media (hover: hover) {
    &:hover:not([data-disabled]) {
      background-color: oklch(97% 0 0deg);

      @media (prefers-color-scheme: dark) {
        background-color: oklch(26.9% 0 0deg);
      }
    }
  }

  &:focus-visible {
    position: relative;
    outline: 2px solid oklch(14.5% 0 0deg);
    z-index: 1;

    @media (prefers-color-scheme: dark) {
      outline-color: white;
    }
  }
`;

const StyledIcon = styled(
  ({ className, ...props }: React.ComponentProps<"svg">) => (
    <PlusIcon className={className} {...props} />
  ),
)`
  transition: transform 100ms ease-out;

  [data-panel-open] > & {
    transform: rotate(45deg);
  }
`;

const StyledPanel = styled(Accordion.Panel)`
  box-sizing: border-box;
  height: var(--accordion-panel-height);
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: height 150ms ease-out;

  &[data-starting-style],
  &[data-ending-style] {
    height: 0;
  }
`;

const StyledContent = styled.div`
  padding: 0.5rem 0.75rem;
  background: black;
`;

export const App = () => {
  return (
    <StyledAccordion>
      <StyledItem>
        <StyledHeader>
          <StyledTrigger>
            What is Base UI?
            <StyledIcon />
          </StyledTrigger>
        </StyledHeader>
        <StyledPanel>
          <StyledContent>
            Base UI is a library of high-quality unstyled React components for
            design systems and web apps.
          </StyledContent>
        </StyledPanel>
      </StyledItem>

      <StyledItem>
        <StyledHeader>
          <StyledTrigger>
            How do I get started?
            <StyledIcon />
          </StyledTrigger>
        </StyledHeader>
        <StyledPanel>
          <StyledContent>
            Head to the “Quick start” guide in the docs. If you’ve used unstyled
            libraries before, you’ll feel at home.
          </StyledContent>
        </StyledPanel>
      </StyledItem>

      <StyledItem>
        <StyledHeader>
          <StyledTrigger>
            Can I use it for my project?
            <StyledIcon />
          </StyledTrigger>
        </StyledHeader>
        <StyledPanel>
          <StyledContent>
            Of course! Base UI is free and open source.
          </StyledContent>
        </StyledPanel>
      </StyledItem>
    </StyledAccordion>
  );
};

function PlusIcon(props: React.ComponentProps<"svg">) {
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
}
