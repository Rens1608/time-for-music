const OfferList = ({ text }: { text: string }) => {
  return (
    <div>
      <p className={`mb-2 text-base text-body-color dark:text-dark-6`}>{text}</p>

    </div>
  );
};

export default OfferList;
