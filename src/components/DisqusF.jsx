/* eslint-disable react/react-in-jsx-scope */
import { DiscussionEmbed } from "disqus-react";

const DisqusComments = () => {
  const disqusShortname = "ramadhan2024";
  const disqusConfig = {
    url: "https://ramadhan2024.vercel.app/",
    // identifier: props.id, // Single post id
    // title: props.title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
