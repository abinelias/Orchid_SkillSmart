using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IGetJobSeekersOverview<T> 
    {
        IEnumerable<T> GetAllJobSeekersOverview(string jobSeekerId);
    }
}
