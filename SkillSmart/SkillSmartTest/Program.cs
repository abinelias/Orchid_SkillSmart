using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SkillSmartWebAPI.Controllers;
using SkillSmart.Dto;
namespace SkillSmartTest
{
    class Program
    {
        public static void Main(string[] args)
        {
            JobSeekerController controller = new JobSeekerController();

           List<JobSeeker> jobSeekerList = controller.GetAll().ToList<JobSeeker>();
            if (jobSeekerList.Count >= 0)
            {

                if (jobSeekerList.Count > 0)
                {
                    var jobSeeker = controller.Get(jobSeekerList[0].Id.ToString());

                    if (jobSeeker != null)
                    {
                        jobSeeker.Birthday = DateTime.Now.ToString();
                        controller.Put(jobSeeker.Id.ToString(), jobSeeker);
                    }
                }
                JobSeeker jobSeekerNew = new JobSeeker();
                jobSeekerNew.FirstName = "Test";
                jobSeekerNew.LastName = "User";
                jobSeekerNew.Email = "test@orchid-software.com";
                jobSeekerNew.Birthday = DateTime.Now.ToString();
                jobSeekerNew.UserName = "test";
                jobSeekerNew.Password = "user";

                controller.Post(jobSeekerNew);

                List<JobSeeker> jobSeekerList2 = controller.GetAll().ToList<JobSeeker>();
                if (jobSeekerList2.Count > 1)
                {
                   controller.Delete(jobSeekerList2[1].Id.ToString());
                }
            }

        }
    }
}
