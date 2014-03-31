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
    public class SkillMapController : ApiController
    {

        public IEnumerable<SkillSmart.Dto.SkillsSpeciality> GetAll(string specialityId)
        {
            var SkillMapListCategory = ServiceFactory.GetSkillMap().GetSkillsByCategoryId(specialityId);
            var allSkillList = ServiceFactory.GetSkill().GetAll();

            List<SkillSmart.Dto.SkillsSpeciality> skillList = new List<SkillSmart.Dto.SkillsSpeciality>();
            foreach (SkillMap mapSkill in SkillMapListCategory)
            {
                if (mapSkill.CategoryId.ToString() == specialityId)
                {
                    var skillId = mapSkill.SkillId;
                    foreach (Skill skillSelect in allSkillList)
                    {
                        if (skillSelect.Id.ToString() == skillId)
                        {
                            
                            SkillSmart.Dto.SkillsSpeciality skillObj = new SkillSmart.Dto.SkillsSpeciality();
                            skillObj.SkillMapId = mapSkill.Id.ToString();
                            skillObj.SkillName = skillSelect.SkillName;

                            skillList.Add(skillObj);
                            break;
                        }
                    }
                }
            }
            return skillList;
        }

        public SkillMap Get(string id)
        {
            return ServiceFactory.GetSkillMap().GetById(id);
        }

        public void Post(SkillMap jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetSkillMap().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, SkillMap jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetSkillMap().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            ISkillMapService<SkillMap> jobSeekerService = ServiceFactory.GetSkillMap();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}