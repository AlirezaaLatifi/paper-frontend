function Profile() {
  return (
    <div className="grid place-items-center gap-0  min-h-[70vh]">
      <img
        className="w-1/4 rounded-full mx-auto mb-8"
        src={
          import.meta.env.PROD
            ? '/paper-frontend/developing.png'
            : 'developing.png'
        }
        alt="under development =D"
      />
    </div>
  );
}

export default Profile;
