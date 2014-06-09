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
    public class SkillAliasController : ApiController
    {

        /// <summary>
        /// To get all skill alias for a skill
        /// </summary>
        /// <returns>SkillAlias Object</returns>
        public IEnumerable<SkillAlias> GetAllSkillAliasById()
        {
            return ServiceFactory.GetSkillAlias().GetAllSkillAliasById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        /// <summary>
        /// To get a skill alias details 
        /// </summary>
        /// <param name="id">skillAliasId</param>
        /// <returns>SkillAlias Object</returns>
        public SkillAlias Get(string id)
        {
            return ServiceFactory.GetSkillAlias().GetById(id);
        }

        /// <summary>
        /// To create a newskill alias
        /// </summary>
        /// <param name="skillAliasObj">SkillAlias Object</param>
        public void Post(SkillAlias skillAliasObj)
        {
            try
            {
                ServiceFactory.GetSkillAlias().Create(skillAliasObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update Skill Alias details
        /// </summary>
        /// <param name="id">skillAliasId</param>
        /// <param name="skillAliasObj">SkillAlias Object</param>
        public void Put(string id, SkillAlias skillAliasObj)
        {
            try
            {
              skillAliasObj.Id = new Guid(id);
                ServiceFactory.GetSkillAlias().Update(skillAliasObj);
            }
            catch (Exception exp){}
        }
    }
}