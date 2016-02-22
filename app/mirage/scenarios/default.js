export default function( server ) {
  Array(10).fill().forEach(() => {
   const organization = server.create('organization');
   const repository = server.create('repository', { organization: organization.id });
   server.create('user', { repository: repository.id });
  });
}
