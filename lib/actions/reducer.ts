export const TOGGLE_CATEGORIES = 'TOGGLE_CATEGORIES';

export const toggleCategories = () => ({
  type: TOGGLE_CATEGORIES
});

let cateogrryOptions = ['Option 1', 'Option 2', 'Option 3'];    

let currentOptionIndex = 0;

setInterval(() => {
  currentOptionIndex = (currentOptionIndex + 1) % cateogrryOptions.length;
  const currentOption = cateogrryOptions[currentOptionIndex];
  console.log(currentOption); // Hacer algo con la opción actual
}, 10000); // Cambia la opción cada 3 segundos