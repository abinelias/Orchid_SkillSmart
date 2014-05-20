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
            ListJobSeekerSkillController controller = new ListJobSeekerSkillController();



            List<SkillSmart.Dto.ListingJobSeekerSkills> jobSeekerList = controller.GetAll("d7cb31e2-2288-44f7-99af-f1a27fc8027a").ToList<SkillSmart.Dto.ListingJobSeekerSkills>();
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

           
            

            JobsList company = new JobsList();
            company.JobPosition = "Accountant";
            company.CompanyId = "123";
            company.CompanyName = "Brandekko";
            company.JobLocation = "Washington ,DC Area";
            company.PostingDate = "Apr 29, 2014";
            company.JobViews = "452";
            company.ApplicantsNumber = "120";
            company.ApplicantAverage = "68";
            company.JobSalary = "731e7c90-9e62-4703-a463-8ce2bb6f5b48";
            company.JobDescription = "Doing the account works at the company";
           
            controller.Post(company); 
            
             */


            //List<LookupDto> jobSeekerList2 = controller.GetAll("SecurityClearance").ToList<LookupDto>();
            //if (jobSeekerList2.Count > 1)
            //{
             //  controller.Delete(jobSeekerList2[1].Id.ToString());
            //}
        //}

        }

    }
}