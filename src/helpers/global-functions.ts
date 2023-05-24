/**
 * A helper function to toggle the theme between light and dark
 * @param currentTheme
 */
export function toggleTheme(currentTheme: string | undefined): string {
  return currentTheme === "dark" ? "light" : "dark";
}
