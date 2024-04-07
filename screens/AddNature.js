import NatureForm from "../components/Nature/NatureForm"; // Import NatureForm component
import { addNature } from "../util/db"; // Import addNature function from util/db

// AddNature component to handle adding a new nature entry
function AddNature({ navigation }) {
  // Function to handle creating a new nature entry
  async function createNatureHandler(nature) {
    // Call addNature function to add the new nature entry to the database
    await addNature(nature);
    // Navigate back to the NatureLog screen after adding the nature entry
    navigation.navigate("NatureLog");
  }

  // Render NatureForm component with createNatureHandler as prop
  return <NatureForm onCreateNature={createNatureHandler} />;
}

// Export the AddNature component as the default export
export default AddNature;