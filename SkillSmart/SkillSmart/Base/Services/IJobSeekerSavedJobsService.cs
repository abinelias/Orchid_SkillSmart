using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobSeekerSavedJobsService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAllSavedJobsJobSeeker(string jobSeekerId);
    }
}
