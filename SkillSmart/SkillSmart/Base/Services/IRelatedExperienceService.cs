using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IRelatedExperienceService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllRelatedExperience(string jobseekerId);
    }
}
