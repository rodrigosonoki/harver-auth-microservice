function createAuthService(repository) {
  const find = async (email) => await repository.findByEmail(email);
  const create = async (user) => await repository.insert(user);

  return {
    find,
    create,
  };
}

export default createAuthService;
