import StoryForm from "../StoryForm";

const CreateStoryForm = () => {
  const story = {
    title: '',
    description: '',
    article_url: '',
    shorts_url: '',
    };


  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <StoryForm
      story={story}
      formType="Create Story"
    />
  );
};

export default CreateStoryForm;
