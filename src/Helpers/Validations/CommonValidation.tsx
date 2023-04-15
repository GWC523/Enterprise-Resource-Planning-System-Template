//Handle validation Change
export const handleValidationChange = (name: any, value: any, set: (arg0: (prevState: any) => any) => void) => {
  set((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
