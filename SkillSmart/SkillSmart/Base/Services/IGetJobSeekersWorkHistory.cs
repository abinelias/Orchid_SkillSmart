using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IGetJobSeekersWorkHistory<T> 
    {
        IEnumerable<T> GetAllJobSeekersWorkHistory(string jobSeekerId);
    }
}
