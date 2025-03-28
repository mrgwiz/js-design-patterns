import { type Pattern } from "@shared/schema";

/**
 * Generate a markdown document from a pattern object
 */
export function generateMarkdown(pattern: Pattern): string {
  const markdown = `
# ${pattern.name}

${pattern.description}

## Category

${pattern.category.charAt(0).toUpperCase() + pattern.category.slice(1)}

## Type

${pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)}

## Difficulty

${pattern.difficulty.charAt(0).toUpperCase() + pattern.difficulty.slice(1)}

## Description

${pattern.content.replace(/<[^>]*>/g, '')}

## Implementation Example

\`\`\`javascript
${pattern.codeExample}
\`\`\`

## Real-World Applications

${pattern.realWorldExamples.map(example => `### ${example.title}\n\n${example.description}`).join('\n\n')}

## Benefits

${pattern.benefits.map(benefit => `- ${benefit}`).join('\n')}

## Drawbacks

${pattern.drawbacks.map(drawback => `- ${drawback}`).join('\n')}

## Related Patterns

${pattern.relatedPatterns.map(related => `- **${related.name}**: ${related.description}`).join('\n')}

## Further Reading

${pattern.furtherReading.map(reference => `- [${reference.title}](${reference.url || '#'}): ${reference.description}`).join('\n')}

---

Generated from JS Design Patterns Learning Platform
`;

  return markdown.trim();
}
