export function toggleTheme(currentTheme: string | undefined): string {
  return currentTheme === "dark" ? "light" : "dark";
}
