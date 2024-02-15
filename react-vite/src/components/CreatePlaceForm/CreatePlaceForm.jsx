import PlaceForm from "../PlaceForm";

const CreatePlaceForm = () => {
  const place = {
    name: '',
    type: '',
    description: '',
    };


  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <PlaceForm
      place={place}
      formType="Create Place"
    />
  );
};

export default CreatePlaceForm;
