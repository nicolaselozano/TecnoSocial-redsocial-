import { Project } from '@/features/project/projectEntity';
import { User } from '@/features/user/userEntity';
import { project, user, userProject } from '.';
import { PROJECTS_MOCK } from './mockups/projects.mock';

export async function seedProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    PROJECTS_MOCK.map(async (pro) => {
      // Get all users who liked the project
      const projectLikers = await Promise.all(
        pro.likes.map(
          async (userLike) =>
            await user.findOne({
              where: {
                name: userLike,
              },
            }),
        ),
      );

      const newProject = project.create({
        description: pro.description,
        name: pro.name,
        url: pro.url,
      });

      if (pro.likes) {
        newProject.liked_users = projectLikers as User[];
      }

      await project.save(newProject);

      // Create user project relation
      const projectParticipants = await Promise.all(
        pro.participants.map(async (participant) => {
          const u = await user.findOne({
            where: {
              name: participant.name,
            },
          });

          return userProject.create({
            project: newProject,
            user: u!,
            role: participant.role,
          });
        }),
      );
      await userProject.save(projectParticipants);
      return newProject;
    }),
  );
  console.log('💻 -- Projects seeded succesfully.');
  return projects;
}
