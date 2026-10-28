import React from "react";

// Claude's signature 8-pointed terracotta starburst icon
export const ClaudeStarburst = ({ className = "w-5 h-5", size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C12.3 5.8 14.2 7.7 18 8C14.2 8.3 12.3 10.2 12 14C11.7 10.2 9.8 8.3 6 8C9.8 7.7 11.7 5.8 12 2Z"
      fill={color}
    />
    <path
      d="M17.5 13C17.7 15.3 18.7 16.3 21 16.5C18.7 16.7 17.7 17.7 17.5 20C17.3 17.7 16.3 16.7 14 16.5C16.3 16.3 17.3 15.3 17.5 13Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M6.5 14C6.7 16 7.6 16.9 9.6 17.1C7.6 17.3 6.7 18.2 6.5 20.2C6.3 18.2 5.4 17.3 3.4 17.1C5.4 16.9 6.3 16 6.5 14Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

// Claude's Anthropic classic sparkle / sunburst
export const AnthropicSparkle = ({ className = "w-4 h-4", size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// Claude Artifact Window Icon
export const ClaudeArtifactIcon = ({ className = "w-4 h-4", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="3" rx="3" />
    <path d="M15 3v18" />
    <path d="m8 9 3 3-3 3" />
  </svg>
);
