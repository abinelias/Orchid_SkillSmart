using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobViewsService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllJobSeekerViewJobs(string jobSeekerId);
    }
}
