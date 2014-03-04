using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IJobSeekerSkillListService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetJobSeekerSkillListByAcquiredId(string jobSeekerId, string acquiredId);
        IEnumerable<T> GetAllJobseekerListById(string id);

    }
}
