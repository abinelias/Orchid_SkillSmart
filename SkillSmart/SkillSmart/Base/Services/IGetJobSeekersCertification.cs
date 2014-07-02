using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IGetJobSeekersCertification<T> 
    {
        IEnumerable<T> GetAllJobSeekersCertification(string jobSeekerId);
    }
}
