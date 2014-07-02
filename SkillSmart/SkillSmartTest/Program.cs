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
            LookupByCriteriaController controller = new LookupByCriteriaController();



            //List<SkillSmart.Dto.LookupByCriteria> jobSeekerList = controller.GetAll("State", "ec6bf599-c460-45b0-a093-a78c325cf08f").ToList<SkillSmart.Dto.LookupByCriteria>();
            /*  if (jobSeekerList.Count >= 0)
              {
            2b3f4f88-c219-4294-90af-a144a4383247
                  if (jobSeekerList.Count > 0)
                  {*/
            //var jobSeeker = controller.GetAll("State", "ec6bf599-c460-45b0-a093-a78c325cf08f"); 

            /* if (jobSeeker != null)
             {
                 jobSeeker.Birthday = DateTime.Now.ToString();
                 controller.Put(jobSeeker.Id.ToString(), jobSeeker);   
             }  

           
            */

            LookupByCriteria company = new LookupByCriteria();
            company.Name = "DC";
            company.ParentId = "ec6bf599-c460-45b0-a093-a78c325cf08f";
            

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