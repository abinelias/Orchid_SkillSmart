using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class SkillController : ApiController
    {
        /// <summary>
        /// To get a skill by id
        /// </summary>
        /// <param name="id">SkillId</param>
        /// <returns>Skill Object</returns>
        public Skill Get(string id)
        {
            return ServiceFactory.GetSkill().GetById(id);
        }

        /// <summary>
        /// To create a skill
        /// </summary>
        /// <param name="skillObj">Skill Object</param>
        public void Post(Skill skillObj)
        {
            try
            {
                ServiceFactory.GetSkill().Create(skillObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To Update a skill
        /// </summary>
        /// <param name="id"></param>
        /// <param name="skillObj">Skill Object</param>
        public void Put(string id, Skill skillObj)
        {
            try
            {
                skillObj.Id = new Guid(id);
                ServiceFactory.GetSkill().Update(skillObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a skill
        /// </summary>
        /// <param name="id">SkillId</param>
        public void Delete(string id)
        {
            ISkillService<Skill> jobSeekerService = ServiceFactory.GetSkill();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}