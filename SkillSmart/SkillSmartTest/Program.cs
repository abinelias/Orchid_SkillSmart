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
            JobSeekerMessageController controller = new JobSeekerMessageController();



            //List<SkillSmart.Dto.JobSeekerMessage> jobSeekerList = controller.GetAll("d7cb31e2-2288-44f7-99af-f1a27fc8027a").ToList<SkillSmart.Dto.JobSeekerMessage>();
            /*  if (jobSeekerList.Count >= 0)
              {

                  if (jobSeekerList.Count > 0)
                  {*/
            //var jobSeeker = controller.GetAll("State", "ec6bf599-c460-45b0-a093-a78c325cf08f"); 

            /* if (jobSeeker != null)
             {
                 jobSeeker.Birthday = DateTime.Now.ToString();
                 controller.Put(jobSeeker.Id.ToString(), jobSeeker);   
             }  

           */


            JobSeekerMessage company = new JobSeekerMessage();
            company.JobSeekerId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";
            company.CompanyId = "50535a0e-0dae-4772-ad7f-d8737223fbdd";
            company.EmployerId = "7a126dae-fa6c-45b5-bc0e-3e8289e9a356";
            company.JobId = "d290d009-f473-4e53-8f73-8c5381931cd6";
            company.Subject = "Call Letter";
            company.Message = "Come and join on Aug 1St";
           
            controller.Post(company); 
            
             


            //List<LookupDto> jobSeekerList2 = controller.GetAll("SecurityClearance").ToList<LookupDto>();
            //if (jobSeekerList2.Count > 1)
            //{
             //  controller.Delete(jobSeekerList2[1].Id.ToString());
            //}
        //}

        }

    }
}