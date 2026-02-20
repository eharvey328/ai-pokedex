# AI Pokedex

This is a test between AIs using the [IBM Quantum Frontend Challenge](https://github.com/IBM/quantum-careers/tree/master/challenges/frontend).

1. IBM Bob
2. Claude Sonnet 4.6 with Vercel's [react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) skill

## Results

| AI     | Application                          | Write-up (done by the AI)      |
| ------ | :----------------------------------- | :----------------------------- |
| Bob    | https://ai-pokedex-bob.vercel.app    | [README.md](/Bob/README.md)    |
| Claude | https://ai-pokedex-claude.vercel.app | [README.md](/Claude/README.md) |

## Methodology

The final applications do not have any follow up responses. The app is the direct output of this prompt:

`You are tasked with building a frontend application. Imagine this application serves as your interview for a software developer job. This means you should use this opportunity to showcase your skills as best as you can to try and stand out as an applicant. You should show your knowledge of modern frontend architecture, knowledge of frontend libraries and their features, creativity, and solid software patterns. In this folder are instructions at README.md and example images in example folder. Again I cannot stress this enough, it does not need to MATCH the example, it is only provided for context. You should build the very best version of the application you can to showcase your skills. You can add features that you think would be cool, you can use new software patterns that make the application more efficient, attempt to make the application as performant as you can, and design the application style to your heart’s desire.`

## Comparison

- The most obvious thing is core features don't work in Bob's application (search and clicking evolutions). Claude has all core features working. I think this is due to Claude's final step which ran a verification to build and serve the app and manually test functionality. Bob completed once the code was done.
- They both have a surprisingly similar UI, even down to the header background blur.
- They both decided animations are awesome (probably due to my prompt language).
  - Both app's animations are a bit messy, but Claude's are more polished.
- I think it is interesting both also decided to open the Pokemon details in a modal instead of a dedicated route. This makes it so you cannot directly link to it-- which is unideal.

#### Overall

- Claude built the better app with better code.
- I think Bob could fix a few things with some follow up prompts, but from my experience, it struggles with that.
- The code patterns used by each aren't bad, but if I saw these apps come from an application I would hesitate to hire either of them beyond a junior level.

#### Bob's Solution

- I like that it is using the REST API with react query for client caching and `useInfiniteQuery` to handle the infinite scroll
- Odd that it decided to use state management for something so simple
  - I would assume to try follow "best practices", but I don't see stores that often these days.
- Using the latest version of React and Nextjs, but not the new features (e.g, no SSR/static rendering, server actions, or next caching)
- Created a `prefetchPokemon` method but never uses it, lol
- Not sure why it's using kebab-case instead of camelCase for files
- Wrote some unit tests which is good to see, but only for `utils`...

#### Claude's Solution

- Decided to use GraphQL instead of REST, which is interesting.
  - Probably because it is typically nice to use in frontends for efficient data, but in this pokedex case, we will need all data from the API.
  - I find the ApolloClient caching much more challenging than the tanstack useQuery cache
- Also like Bob, it uses the latest version of React and Nextjs, but not many new features.
