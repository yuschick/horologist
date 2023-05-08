import type { V2_MetaFunction } from "@remix-run/node";
import { Page } from "~/components/layout/Page";
import { Text } from "~/components/typography/Text/Text";

// TODO: Add og tags to meta function
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Docs - Horologist" },
    {
      description:
        "Horologist is a JavaScript library for animating DOM elements to represent time in the same ways as many of the world's greatest haute horologist watchmakers",
    },
  ];
};

export default function Index() {
  return (
    <Page>
      <aside>Nav</aside>
      <main>Content</main>
      <aside>sub nav</aside>
    </Page>
  );
}
